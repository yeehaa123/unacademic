export default init;

function init(coverResolver, coverProps, courseResolver, courseProps){

  return {
    cover: {
      resolver: coverResolver,
      props: coverProps
    },
    course: {
      resolver: courseResolver,
      props: courseProps
    }
  };
}
