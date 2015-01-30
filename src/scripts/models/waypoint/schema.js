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
      clonedFrom: {
        type: 'string'
      },
      clones: {
        type: 'array'
      },
      curator: {
        type: 'string',
        required: true
      },
      summary: {
        type: 'string'
      },
      description: {
        type: 'string'
      }
    }
  };
}
