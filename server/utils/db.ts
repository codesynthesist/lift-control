import { createClient } from '@supabase/supabase-js';

if (!process.env.SUPABASE_KEY || !process.env.SUPABASE_URL) {
    throw new Error('supabase key is not available in env variables');
}

export const db = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);


export type SupabaseError = {
    code: string
    message: string
    details?: string
    hint?: string
}

export function handleSupabaseError(error: SupabaseError) {
    const errorMap: Record<string, { status: number; message: string }> = {
        '23505': { status: 409, message: 'Duplicate entry' },
        'PGRST116': { status: 404, message: 'Resource not found' },
        '42501': { status: 403, message: 'Permission denied' },
    };

    const errorInfo = errorMap[error.code] || {
        status: 500,
        message: error.message || 'Database error',
    };

    throw createError({
        statusCode: errorInfo.status,
        statusMessage: errorInfo.message,
        data: {
            code: error.code,
            details: error.details,
            hint: error.hint,
        },
    });
}

export async function query<T>(
    query: Promise<{ data: T | null; error: SupabaseError | null }>,
): Promise<T> {
    const { data, error } = await query;

    if (error) {
        console.error('Supabase error:', error);
        handleSupabaseError(error);
    }

    if (!data) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Data not found',
        });
    }

    return data;
}


