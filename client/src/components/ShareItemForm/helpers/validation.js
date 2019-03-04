export default function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Title Required';
  }
  if (!values.description) {
    errors.description = 'Description Required';
  }

  return errors;
}
