import AppDataSource from '@/data-source';

import { Member } from '@/models';

export const memberRepository = AppDataSource.getRepository(Member);

export const findAllMembers = async () => {
   return await memberRepository.find();
};

export const findMemberById = async (id: number) => {
   return await memberRepository.findOneBy({ id });
};

export const createNewMember = async (data: Partial<Member>) => {
   const member = new Member();

   member.name = data.name;

   return await memberRepository.save(member);
};

export const updateMemberUsingPrevMember = async (prev: Member, data: Partial<Member>) => {
   prev.name = data.name || prev.name;
   
   return await memberRepository.save(prev);
};

export const deleteMemberByMemberObj = async (memberToDelete: Member) => {
   return await memberRepository.remove(memberToDelete);
};

