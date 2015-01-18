export default CoverInit;

function CoverInit(BaseClass, schema, initData){

  class Cover extends BaseClass {}

  Cover.initialize({schema: schema, initData: initData});

  return Cover;
};
