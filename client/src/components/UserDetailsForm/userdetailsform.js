import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { required } from '../../validators';

const UserDetailsForm = props => {
  const { handleSubmit, pristine, submitting, formError } = props;
  return(
    <form>
      <div className="form-group">
        <Field
          name='username'
          type='text'
          placeholder='Username'
          validate={required}
          className='form-control'
          component="input"
        />
      </div>
      <div className="form-group">
        <Field
          name='password'
          type='password'
          placeholder='Password'
          validate={required}
          className='form-control'
          component="input"
        />
      </div>
      { formError &&
        <small className="form-text text-muted" style={{ marginBottom: '1em' }}>{formError}</small>
      }
      <button className="btn btn-primary" disabled={pristine || submitting} onClick={handleSubmit(values => {
        props.onSubmit({
          ...values,
          type: 'login'
        })
      })}>
        Login
      </button>
      <button className="btn btn-primary" disabled={pristine || submitting} onClick={handleSubmit(values => {
        props.onSubmit({
          ...values,
          type: 'register'
        })
      })}>
        Register
      </button>
    </form>
  )
}

export default reduxForm({
  form: 'UserDetailsForm'
})(UserDetailsForm);
