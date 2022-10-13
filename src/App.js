import React from 'react';
import './App.css';
import FormInput from './components/FormInput';

function App() {
  const [values, setValues] = React.useState(JSON.parse(localStorage.getItem("regForm")) || 
  {
      fullName: "",
      username: "",
      email: "",
      birthday: "",
      password: "",
      confirmPassword: "",
      isAgree: false
    }
  )

  const inputs =  [
    {
      id: 0,
      name: "fullName",
      type: "text",
      placeholder: "Name Surname",
      label: "Full name",
      errorMessage: "Incorrect full name",
      pattern: "(^[A-Za-z]{3,16})([ ]{0,1})([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})?([ ]{0,1})?([A-Za-z]{3,16})",
      required: true
    },
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      label: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include any special character!",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "It should be a valid email address!",
      required: true
    },
    {
      id: 3,
      name: "birthday",
      type: "date",
      placeholder: "Date of birth",
      label: "Date of birth",
      errorMessage: "Select the date of birth",
      required: true
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true
    }
  ]
  
  function onChange(e) {
    const {name, value, type, checked} = e.target
    return setValues(prevValues=>({...prevValues, [name]: type === "checkbox" ? checked : value}))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const correctFullName = values.fullName.toLowerCase().split(" ").map(word=>word[0].toUpperCase()+word.slice(1)).join(" ")
    const correctUsername = values.username.toLowerCase()
    setValues(prevValues=>({...prevValues, fullName: correctFullName, username: correctUsername}))
    localStorage.setItem("regForm", JSON.stringify({...values, fullName: correctFullName, username: correctUsername /* password: "", confirmPassword: "" */}))
    alert(`Full name: ${values.fullName}\nUsername: ${values.username}\nEmail: ${values.email}\nDate of bitrh: ${values.birthday}\n${values.isAgree ? "You are agreed to the terms\n" : ""}Your data is saved`)
  }

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Registration</h1>
        {inputs.map(input => (
          <FormInput 
            key={input.id} 
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />))}
          <input
            type="checkbox"
            checked={values.isAgree}
            name="isAgree"
            onChange={onChange}
          />
          <label>I am agree to the <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title='Definitely not a rickroll link' target="_blank" rel="noreferrer">terms</a></label>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
