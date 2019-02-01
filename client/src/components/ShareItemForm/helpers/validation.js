export default function validate(values) {
  const errors = {};
  console.log('value in validation is:', values);
  if (!values.title) {
    errors.title = 'Title Required';
  }
  if (!values.description) {
    errors.description = 'Description Required';
  }

  console.log('error is:');
  console.log(errors);

  return errors;
}
