export default coverProps;

function coverProps(){
  return data;

  function data(goTo){
    return  {
      learn: [
        'summary',
        'description'
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
