import React, { useEffect, useRef, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import axios from 'axios';

let renderCount = 0;
export const Youtubeform = () => {
  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = useForm({
    defaultValues: async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users/1'
      );
      const data = response.data;
      return {
        username: data.username,
        email: data.email,
        channel: '',
      };
    },
    mode: 'onSubmit', //validation modes onSubmit by default, onBlur, onChange, onTouched, all-onBlur+onChange
  });
  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitSuccessful,
    isSubmitted,
  } = formState;

  console.log({ touchedFields, dirtyFields, isDirty });

  function submit(data) {
    console.log(data);
    // alert(data);
  }

  function error() {
    console.log('Error called');
  }

  function displayValues() {
    console.log('Get Values: ', getValues());
  }

  function setValues() {
    setValue('username', '', {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(); //resets to default values
    }
  }, [isSubmitSuccessful]);

  // useEffect(() => {
  //   const subscription = watch((value) => {
  //     console.log(value);
  //   });
  //   return () => subscription.unsubscribe();
  // }, [watch]);
  const { fields, append, remove } = useFieldArray({
    name: 'phNumbers',
    control,
  });
  const watchForm = watch();
  renderCount++;
  return (
    <div>
      <h4>Youtube form render count {renderCount / 2}</h4>
      <h2>{JSON.stringify(watchForm)}</h2>
      <form noValidate>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          {...register('username', {
            required: {
              value: true,
              message: 'Username is required',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.username?.message}</p>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', {
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: 'Invalid Email Format',
            },
            validate: {
              notAdmin: (fieldValue) => {
                return (
                  fieldValue != 'admin@example.com' ||
                  'Enter a different email address'
                );
              },
              notBlackListed: (fieldValue) => {
                return (
                  !fieldValue.endsWith('baddomain.com') ||
                  'This domain is not supported'
                );
              },
              emailExists: async (fieldValue) => {
                const response = await axios.get(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                return !response.data || 'Email already exists';
              },
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.email?.message}</p>
        <label htmlFor="channel">Channel</label>
        <input
          type="text"
          id="channel"
          {...register('channel', {
            required: {
              value: true,
              message: 'Channel is required field',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.channel?.message}</p>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          {...register('password', {
            required: {
              value: true,
              message: 'Password is required field',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.password?.message}</p>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm Password is required field',
            },
            validate: {
              passwordMatch: (value) => {
                return (
                  value === getValues('password') ||
                  'Password fields must match'
                );
              },
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.confirmPassword?.message}</p>

        <select {...register('cars')}>
          <option value="benz">Benz</option>
          <option value="ferari">Ferari</option>
        </select>

        <label htmlFor="twitter">Twitter</label>
        <input
          type="text"
          id="twitter"
          {...register('social.twitter', {
            disabled: watch('channel') == '',
            required: true,
          })}
        />

        <label htmlFor="facebook">Facebook</label>
        <input type="text" id="facebook" {...register('social.facebook')} />

        <label htmlFor="primary phone number">Primary Phone Number</label>
        <input
          type="text"
          id="primary phone number"
          {...register('phonenumbers.0', {
            required: {
              value: true,
              message: 'Primary phone number is required',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.phonenumbers?.[0]?.message}</p>
        <label htmlFor="secondary phone number">Secondary Phone Number</label>
        <input
          type="text"
          id="secondary phone number"
          {...register('phonenumbers.1', {
            required: {
              value: true,
              message: 'Secondary phone number is required',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.phonenumbers?.[1]?.message}</p>

        <label>List of Phone Numbers</label>
        <div>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <input type="text" {...register(`phNumbers.${index}.number`)} />
                <button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <button
            type="button"
            onClick={() => {
              append({ number: '' });
            }}
          >
            Add Phone Number
          </button>
        </div>

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          {...register('age', {
            valueAsNumber: true,
            required: {
              value: true,
              message: 'Age is required field',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.age?.message}</p>

        <label htmlFor="dob">DOB</label>
        <input
          type="date"
          id="dob"
          {...register('dob', {
            valueAsDate: true,
            required: {
              value: true,
              message: 'DOB is required field',
            },
          })}
        />
        <p style={{ color: 'red' }}>{errors.data?.message}</p>

        <button
          disabled={!isDirty || isSubmitting}
          onClick={handleSubmit(submit, error)}
        >
          Submit
        </button>
        <button type="button" onClick={displayValues}>
          Get Values
        </button>
      </form>
      <button type="button" onClick={setValues}>
        Set Value
      </button>
      <DevTool control={control} />
    </div>
  );
};
