import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

const Login = () => {
  const router = useRouter();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/api/user/login", { email: input.email, password: input.password })
      .then((res) => {
        Cookies.set("token", res.data.token);
        router.push("/");
      });
  };

  return (
    <Card color='transparent' shadow={false}>
      <Typography variant='h4' color='blue-gray'>
        Login
      </Typography>
      <Typography color='gray' className='mt-1 font-normal'></Typography>
      <form
        onSubmit={handleSubmit}
        className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'
      >
        <div className='mb-4 flex flex-col gap-6'>
          <Input
            size='lg'
            label='Email'
            id='email'
            name='email'
            type='email'
            autoComplete='email'
            required
            value={input.email}
            onChange={handleChange}
          />
          <Input
            className='mt-8'
            type='password'
            size='lg'
            label='Password'
            id='password'
            name='password'
            autoComplete='current-password'
            required
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <Button className='mt-4' type='submit' fullWidth>
          Login
        </Button>
        <Typography color='gray' className='mt-4 text-center font-normal'>
          <Link
            href='../../auth/register'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Register your account
          </Link>
        </Typography>
      </form>
    </Card>
  );
};

export default Login;
