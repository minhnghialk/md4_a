import React, { memo, FormEvent, useState } from 'react'
import './user.scss'
import api from '@/services/apis'
import DropDown from '@components/DropDown'
import { useTranslation } from 'react-i18next'
import Loading from '@components/Loading'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, message, Modal } from 'antd';


const Login = () =>{
  const [load, setLoad] = useState(false);

  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  
  const {t} = useTranslation();

  async function login(event: FormEvent) {
    event.preventDefault();

    if(load) return

    let data = {
      userName: (event.target as any).userName.value,
      password: (event.target as any).password.value,
    }

    setLoad(true)

        await api.userApi.login(data)
        .then(res => {
            if(res.status != 200) {
                Modal.confirm({
                    content: res.data.message,
                    okText: "thử lại"
                })
            }else {
                Modal.success({
                    content: res.data.message,
                    okText: "ok",
                    onOk: async () => {
                      localStorage.setItem("token", res.data.token),
                      window.location.href = '/'
                    }
                })
            }
        })
        .catch(err => {
            Modal.success({
                content: "Sập server!",
                okText: "thử lại"
            })
        })
        setLoad(false)

    

  }
  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
    <a
      href="#"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-8 h-8 mr-2"
        src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
        alt="logo"
      />
      ABC Store
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {t('createYourAccount')}
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => {login(e)}}>
        <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              User name
            </label>
            <input
              type="text"
              name="userName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="User name"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                aria-describedby="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                
              />
            </div>
            <div className="ml-3 text-sm">
              <label
                htmlFor="terms"
                className="font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          {
            load && <Loading/>
          }
          <button
          
            type="submit"
            className="{`${load && 'active'} btn_submit w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            // style = {{backgroundColor: "blue"}}
          >
            Create an account
            <div className='btn_loading'>
              <Spin indicator={antIcon} />
            </div>
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <a
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </a>
          </p>
          <DropDown/>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default memo(Login)
