export default schema;

function schema(){
  return {
    type: 'object',
    properties: {
      id: {
        type: 'string',
        required: true
      },
      title: {
        type: 'string',
        required: true,
        minLength: 5,
        maxLength: 25

      },
      instructions: {
        type: 'array'
      },
      resources: {
        type: 'array'
      }
    }
  };
}
