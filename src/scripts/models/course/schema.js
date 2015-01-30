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
        minLength: 5,
        maxLength: 25,
        required: true
      },
      curator: {
        type: 'string',
        required: true
      },
      clonedFrom: {
        type: 'string'
      },
      clones: {
        type: 'array'
      },
      keywords: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      waypoints: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      summary: {
        type: 'string',
      },
      description: {
        type: 'string',
      }
    }
  };
}
