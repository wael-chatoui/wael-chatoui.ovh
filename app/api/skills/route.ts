import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, category, level, icon_url, link } = body;

    // Validate required fields
    if (!name || !category || !level) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, and level are required' },
        { status: 400 }
      );
    }

    // Create Supabase client
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    // Insert skill into database
    const { data, error } = await supabase
      .from('skills')
      .insert([
        {
          name,
          category,
          level,
          icon_url: icon_url || null,
          skill_link: link || null,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      // Handle unique constraint violation (duplicate skill name)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A skill with this name already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to create skill', details: error.message },
        { status: 500 }
      );
    }

    // Map skill_link to link for frontend compatibility
    const mappedData = {
      ...data,
      link: data.skill_link,
    };

    return NextResponse.json(
      {
        message: 'Skill created successfully',
        data: mappedData
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

    // Get all skills, ordered by category and name
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
      .order('name', { ascending: true });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch skills', details: error.message },
        { status: 500 }
      );
    }

    // Map skill_link to link for frontend compatibility
    const mappedData = data?.map(skill => ({
      ...skill,
      link: skill.skill_link,
    }));

    return NextResponse.json(
      {
        message: 'Skills fetched successfully',
        data: mappedData,
        count: mappedData?.length || 0
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
    const { id, name, category, level, icon_url, link } = body;

    if (!id || Number.isNaN(Number(id))) {
      return NextResponse.json(
        { error: 'Missing or invalid skill id' },
        { status: 400 }
      );
    }

    if (!name || !category || !level) {
      return NextResponse.json(
        { error: 'Missing required fields: name, category, and level are required' },
        { status: 400 }
      );
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const numericId = Number(id);

    const { data, error } = await supabase
      .from('skills')
      .update({
        name,
        category,
        level,
        icon_url: icon_url || null,
        skill_link: link || null,
      })
      .eq('id', numericId)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);

      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'A skill with this name already exists' },
          { status: 409 }
        );
      }

      return NextResponse.json(
        { error: 'Failed to update skill', details: error.message },
        { status: 500 }
      );
    }

    const mappedData = {
      ...data,
      link: data.skill_link,
    };

    return NextResponse.json(
      {
        message: 'Skill updated successfully',
        data: mappedData,
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
