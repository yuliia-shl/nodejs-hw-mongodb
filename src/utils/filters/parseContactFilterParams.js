const parseIsFavourite = (favourite) => {
  if (typeof favourite === 'boolean') {
    return favourite;
  }
  if (typeof favourite === 'string') {
    if (favourite.toLowerCase() === 'true') return true;
    if (favourite.toLowerCase() === 'false') return false;
  }

  return undefined;
};

export const parseContactFilterParams = ({ isFavourite }) => {
  const parsedIsFavourite = parseIsFavourite(isFavourite);

  return {
    isFavourite: parsedIsFavourite,
  };
};
