const getEnvVaribles = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};

export default getEnvVaribles;
