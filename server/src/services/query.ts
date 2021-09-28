export const getPagination = (limitParam: number, pageParam: number) => {
  const limit = limitParam ? Math.abs(limitParam) : 0;
  const page = pageParam ? Math.abs(pageParam) : 1;
  const skip = (page - 1) * limit;
  return {
    skip,
    limit,
  };
};
