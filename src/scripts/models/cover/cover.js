export default CoverInit;

function CoverInit(BaseClass, coverSchema, coverInitData){

  class Cover extends BaseClass {}

  Cover.initialize({schema: coverSchema, initData: coverInitData});

  return Cover;
};
