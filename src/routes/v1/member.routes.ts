import express from 'express';

import { createMember, getAllMembers, updateMember, deleteMember } from '@/controllers/member.controllers';

const router = express.Router();

router.get('/', getAllMembers);
router.post('/', createMember);
router.patch('/:id', updateMember);
router.delete('/:id', deleteMember);

export default router;

