Annotations = new Mongo.Collection('annotations');

Annotation = Astro.Class({
  name: 'Annotation',
  collection: Annotations,
  fields: {
    time:{
      start: {
        type: 'number',
        validator: Validators.required()
      },
      end: 'number'
    },
    annotationType:{
      type: 'string',
      validator: Validators.required()
    },
    hypervideoId:{
      type: 'string',
      validator: Validators.required()
    }
  }
});
