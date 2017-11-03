Annotations = new Mongo.Collection('annotations');

Annotation = Astro.Class({
  name: 'Annotation',
  collection: Annotations,
  fields: {
    time:{
      start:{
        type: 'number',
        validator: Validators.required()
      },
      end: 'number'
    },
    type:{
      type: 'string',
      validator: Validators.required()
    },
    hypervideoId:{
      type: 'string',
      validator: Validators.required()
    },
    source:{
      type: 'string',
      validator: Validators.required()
    },
    playSrc:{
      From:{
        type: 'string'
      },
      To:{
        type: 'string'
      },
    }
  }
});
