import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      organized_by, 
      start_date, 
      end_date, 
      location, 
      description, 
      image_url, 
      github_link, 
      project_link, 
      role, 
      team_size,
      skill_ids 
    } = body;

    // Validate required fields
    if (!name || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'Missing required fields: name, start_date, and end_date are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Insert hackathon into database
    const { data, error } = await supabase
      .from('hackathons')
      .insert([
        {
          name,
          organized_by: organized_by || null,
          start_date,
          end_date,
          location: location || null,
          description: description || null,
          image_url: image_url || null,
          github_link: github_link || null,
          project_link: project_link || null,
          role: role || null,
          team_size: team_size || null,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create hackathon', details: error.message },
        { status: 500 }
      );
    }

    // Link skills to hackathon if skill_ids provided
    if (skill_ids && Array.isArray(skill_ids) && skill_ids.length > 0) {
      const skillLinks = skill_ids.map(skillId => ({
        hackathon_id: data.id,
        skill_id: skillId
      }));

      const { error: linkError } = await supabase
        .from('hackathon_skills')
        .insert(skillLinks);

      if (linkError) {
        console.error('Error linking skills:', linkError);
        // Don't fail the whole request, just log the error
      }
    }

    return NextResponse.json(
      { 
        message: 'Hackathon created successfully',
        data 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Get all hackathons with their linked skills
    const { data: hackathons, error: hackError } = await supabase
      .from('hackathons')
      .select('*')
      .order('start_date', { ascending: false });

    if (hackError) {
      console.error('Supabase error:', hackError);
      return NextResponse.json(
        { error: 'Failed to fetch hackathons', details: hackError.message },
        { status: 500 }
      );
    }

    // Fetch skills for each hackathon
    const hackathonsWithSkills = await Promise.all(
      (hackathons || []).map(async (hack) => {
        const { data: skillLinks } = await supabase
          .from('hackathon_skills')
          .select('skill_id')
          .eq('hackathon_id', hack.id);

        if (skillLinks && skillLinks.length > 0) {
          const skillIds = skillLinks.map(link => link.skill_id);
          const { data: skills } = await supabase
            .from('skills')
            .select('*')
            .in('id', skillIds);
          
          return { ...hack, skills: skills || [] };
        }

        return { ...hack, skills: [] };
      })
    );

    return NextResponse.json(
      { 
        message: 'Hackathons fetched successfully',
        data: hackathonsWithSkills,
        count: hackathonsWithSkills?.length || 0
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
