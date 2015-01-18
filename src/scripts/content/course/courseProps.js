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
        'learners',
        'waypoints'
      ],
      curate: [
        {
        key: 'title',
      },
      {
        key: 'summary',
      },
      {
        key: 'description',
        type: 'textarea',
      },
      {
        key: 'keywords',
      },
      {
        type: 'button',
        title: 'Add New Course',
        onClick: () => goTo()
      },
      {
        type: 'submit',
        title: 'Save',
      }
      ]
    }
  }
}
