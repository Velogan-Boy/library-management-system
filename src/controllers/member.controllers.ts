import { Request, Response } from 'express';

import { createNewMember, findAllMembers, findMemberById, updateMemberUsingPrevMember, deleteMemberByMemberObj } from '@/services';

import { catchAsync } from '@/utils/catchAsync';

// @route GET /members
// @desc Get All Members
// @body none

export const getAllMembers = catchAsync(async (_req: Request, res: Response) => {
   const members = await findAllMembers();

   return res.status(200).json({
      message: 'Members fetched successfully',
      result: members.length,
      members,
   });
});

// @route POST /members
// @desc Create New Member
// @body name

export const createMember = catchAsync(async (req: Request, res: Response) => {
   const newMember = await createNewMember(req.body);

   return res.status(200).json({ message: 'Member inserted successfully', member: newMember });
});
// @route PATCH /members/:id
// @desc Update a Member using id
// @body name
// @params id

export const updateMember = catchAsync(async (req: Request, res: Response) => {
   const memberToUpdate = await findMemberById(+req.params.id);

   if (!memberToUpdate) return res.status(404).json({ messge: 'Member not found' });

   const updatedMember = await updateMemberUsingPrevMember(memberToUpdate, req.body);

   return res.status(200).json({
      message: 'Member updated successfully',
      member: updatedMember,
   });
});

// @route DELETE /members/:id
// @desc Delete a Member using id
// @body none
// @params id

export const deleteMember = catchAsync(async (req: Request, res: Response) => {
   const memberToDelete = await findMemberById(+req.params.id);

   if (!memberToDelete) return res.status(404).json({ messge: 'Member not found' });

   const deletedMember = await deleteMemberByMemberObj(memberToDelete);

   return res.status(200).json({
      message: 'Member deleted successfully',
      member: deletedMember,
   });
});

