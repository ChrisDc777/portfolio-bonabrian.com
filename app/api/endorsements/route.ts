import type { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import {
  countEndorsement,
  createEndorsement,
  getEndorsements,
} from '@/features/endorsements/server/actions';
import type { SkillCategory } from '@/features/endorsements/types';
import { authOptions } from '@/lib/auth';
import { response } from '@/lib/server';
import type {
  APIErrorResponse,
  APIListResponse,
  APISingleResponse,
} from '@/types/api';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const endorsements = await getEndorsements();
    return response<APIListResponse<SkillCategory>>({ data: endorsements });
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return response<APIErrorResponse>(
        {
          message: 'Unauthenticated',
        },
        401,
      );
    }

    const body = await req.json();
    const { skillId } = body;
    const userId = session.id as string;

    const alreadyEndorsed = await countEndorsement({
      skill_id: skillId,
      userId,
    });

    if (alreadyEndorsed) {
      return response<APIErrorResponse>(
        {
          message: 'Conflict',
        },
        409,
      );
    }

    await createEndorsement({ skillId, userId });

    return response<APISingleResponse<null>>(
      {
        data: null,
      },
      201,
    );
  } catch (error) {
    return response<APIErrorResponse>({
      message: error instanceof Error ? error.message : 'Internal Server Error',
    });
  }
};
