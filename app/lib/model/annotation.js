Annotations = new Mongo.Collection('annotations');

Annotation = Astro.Class({
  name: 'Annotation',
  collection: Annotations,
  fields: {
    name:{
      type: 'string',
    },
    description:{
      type: 'string',
    },
    owner: {
      type: 'string',
      validator: Validators.required(),
    },
    time:{
      start:{
        type: 'number',
        validator: Validators.required(),
      },
      end: 'number'
    },
    type:{
      type: 'string',
      validator: Validators.required(),
    },
    hypervideoId:{
      type: 'string',
      validator: Validators.required(),
    },
    source:{
      type: 'string',
      validator: Validators.required(),
    },
    playSrc:{
      From:{
        type: 'string',
      },
      To:{
        type: 'string',
      },
    },
  },
  methods:{

  },
});
