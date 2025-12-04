import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      company_name,
      role,
      start_date,
      end_date,
      location,
      description,
      image_url,
      website,
      github_link,
      skill_ids
    } = body;

    // Validate required fields
    if (!company_name || !role || !start_date) {
      return NextResponse.json(
        { error: 'Missing required fields: company_name, role, and start_date are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Insert experience into database
    const { data, error } = await supabase
      .from('professional_experiences')
      .insert([
        {
          company_name,
          role,
          start_date,
          end_date: end_date || null,
          location: location || null,
          description: description || null,
          image_url: image_url || null,
          website: website || null,
          github_link: github_link || null,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create experience', details: error.message },
        { status: 500 }
      );
    }

    // Link skills to experience if skill_ids provided
    if (skill_ids && Array.isArray(skill_ids) && skill_ids.length > 0) {
      const skillLinks = skill_ids.map(skillId => ({
        experience_id: data.id,
        skill_id: skillId
      }));

      const { error: linkError } = await supabase
        .from('experience_skills')
        .insert(skillLinks);

      if (linkError) {
        console.error('Error linking skills:', linkError);
        // Don't fail the whole request, just log the error
      }
    }

    return NextResponse.json(
      {
        message: 'Experience created successfully',
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

    // Get all experiences with their linked skills
    const { data: experiences, error: expError } = await supabase
      .from('professional_experiences')
      .select('*')
      .order('start_date', { ascending: false });

    if (expError) {
      console.error('Supabase error:', expError);
      return NextResponse.json(
        { error: 'Failed to fetch experiences', details: expError.message },
        { status: 500 }
      );
    }

    // Fetch skills for each experience
    const experiencesWithSkills = await Promise.all(
      (experiences || []).map(async (exp) => {
        const { data: skillLinks } = await supabase
          .from('experience_skills')
          .select('skill_id')
          .eq('experience_id', exp.id);

        if (skillLinks && skillLinks.length > 0) {
          const skillIds = skillLinks.map(link => link.skill_id);
          const { data: skills } = await supabase
            .from('skills')
            .select('*')
            .in('id', skillIds);

          return { ...exp, skills: skills || [] };
        }

        return { ...exp, skills: [] };
      })
    );

    return NextResponse.json(
      {
        message: 'Experiences fetched successfully',
        data: experiencesWithSkills,
        count: experiencesWithSkills?.length || 0
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

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      company_name,
      role,
      start_date,
      end_date,
      location,
      description,
      image_url,
      website,
      github_link,
      skill_ids,
    } = body;

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Missing or invalid experience id' },
        { status: 400 }
      );
    }

    if (!company_name || !role || !start_date) {
      return NextResponse.json(
        { error: 'Missing required fields: company_name, role, and start_date are required' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('professional_experiences')
      .update({
        company_name,
        role,
        start_date,
        end_date: end_date || null,
        location: location || null,
        description: description || null,
        image_url: image_url || null,
        website: website || null,
        github_link: github_link || null,
      })
      .eq('id', Number(id))
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to update experience', details: error.message },
        { status: 500 }
      );
    }

    if (Array.isArray(skill_ids)) {
      await supabase.from('experience_skills').delete().eq('experience_id', Number(id));

      if (skill_ids.length > 0) {
        const skillLinks = skill_ids.map((skillId: number) => ({
          experience_id: Number(id),
          skill_id: skillId,
        }));
        await supabase.from('experience_skills').insert(skillLinks);
      }
    }

    return NextResponse.json(
      {
        message: 'Experience updated successfully',
        data,
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
