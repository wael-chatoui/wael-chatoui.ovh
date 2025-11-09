import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      description, 
      github_link, 
      live_link, 
      image_url, 
      featured,
      skill_ids 
    } = body;

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: 'Missing required fields: name and description are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Insert project into database
    const { data, error } = await supabase
      .from('side_projects')
      .insert([
        {
          name,
          description,
          github_link: github_link || null,
          live_link: live_link || null,
          image_url: image_url || null,
          featured: featured || false,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to create project', details: error.message },
        { status: 500 }
      );
    }

    // Link skills to project if skill_ids provided
    if (skill_ids && Array.isArray(skill_ids) && skill_ids.length > 0) {
      const skillLinks = skill_ids.map(skillId => ({
        project_id: data.id,
        skill_id: skillId
      }));

      const { error: linkError } = await supabase
        .from('project_skills')
        .insert(skillLinks);

      if (linkError) {
        console.error('Error linking skills:', linkError);
        // Don't fail the whole request, just log the error
      }
    }

    return NextResponse.json(
      { 
        message: 'Project created successfully',
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

    // Check if filtering for featured projects
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get('featured') === 'true';

    let query = supabase
      .from('side_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (featuredOnly) {
      query = query.eq('featured', true);
    }

    const { data: projects, error: projError } = await query;

    if (projError) {
      console.error('Supabase error:', projError);
      return NextResponse.json(
        { error: 'Failed to fetch projects', details: projError.message },
        { status: 500 }
      );
    }

    // Fetch skills for each project
    const projectsWithSkills = await Promise.all(
      (projects || []).map(async (proj) => {
        const { data: skillLinks } = await supabase
          .from('project_skills')
          .select('skill_id')
          .eq('project_id', proj.id);

        if (skillLinks && skillLinks.length > 0) {
          const skillIds = skillLinks.map(link => link.skill_id);
          const { data: skills } = await supabase
            .from('skills')
            .select('*')
            .in('id', skillIds);
          
          return { ...proj, skills: skills || [] };
        }

        return { ...proj, skills: [] };
      })
    );

    return NextResponse.json(
      { 
        message: 'Projects fetched successfully',
        data: projectsWithSkills,
        count: projectsWithSkills?.length || 0
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
