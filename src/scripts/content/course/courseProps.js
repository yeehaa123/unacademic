export default courseProps;

function courseProps(){
  return data;

  function data(goTo){
    return  {
      learn: [
        'curator',
        'summary',
        'description',
        'keywords',
        'learners'
      ],
      curate: './scripts/content/views/courseForm.html'
    }
  }
}
