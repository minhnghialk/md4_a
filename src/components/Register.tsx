import { memo, FormEvent, useState } from 'react'
import './user.scss'
import api from '@/services/apis'
import DropDown from '@components/DropDown'
import { useTranslation } from 'react-i18next'
import Loading from '@components/Loading'
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Modal } from 'antd';

const Register = () =>{
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

  async function register(event: FormEvent) {
    event.preventDefault();
    console.log((event.target as any).userName.value)
    const userName = (event.target as any).userName.value
    const email = (event.target as any).email.value
    const password = (event.target as any).password.value
    const firstName = (event.target as any).firstName.value
    const lastName = (event.target as any).lastName.value
    if (userName === '' || email === '' || password === '' || firstName === '' || lastName === '') {
      alert('Please fill all fields')
    }
    if (userName.length < 3) {
      alert('User name must be at least 3 characters or more')
    }
    // if (email.length >= 3) {
    //   alert('Invalid email address')
    // }
    else if (password.length < 6) {
      alert('Your password must be at least 6 characters or more')
    }

    function isValidEmail(email: string): boolean {
      // Sử dụng biểu thức chính quy để kiểm tra địa chỉ email
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      
      // Sử dụng test() để kiểm tra xem địa chỉ email có hợp lệ hay không
      return emailPattern.test(email);
    }
    
    if (!isValidEmail(email)) {
      alert("Invalid email address");
    }
    
    if(load) return
    
    let newUser = {
      email: (event.target as any).email.value,
      userName: (event.target as any).userName.value,
      password: (event.target as any).password.value,
      firstName: (event.target as any).firstName.value,
      lastName: (event.target as any).lastName.value,
    }
    // let result = await api.userApi.register(newUser);  
    // console.log(result);

    setLoad(true)
        await api.userApi.register(newUser)
        .then(res => {
            if(res.status != 200) {
                Modal.confirm({
                    content: res.data.message,
                    okText: "thử lại"
                })
            }else {
                Modal.success({
                    content: res.data.message,
                    okText: "login"
                })
            }
        })
        .catch(err => {
          console.log("err", err);
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
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0" style={{height: '100%'}}>
    <a
      href="#"
      className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
    >
      <img
        className="w-8 h-8 mr-2"
        src="https://ruoutaychinhhang.com/userfiles/images/logo.png"
        alt="logo"
        style={{width: '300px'}}
      />
      {/* ABC Store */}
    </a>
    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
      <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
        {t('createYourAccount')}
        </h1>
        <form className="space-y-4 md:space-y-6" action="#" onSubmit={(e) => {register(e)}}>
        <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('userName')}
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
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('passWord')}
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              name="confirm-password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('firstName')}
            </label>
            <input
              type="firstName"
              name="firstName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="First name"
            />
          </div>
          <div>
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {t('lastName')}
            </label>
            <input
              type="lastName"
              name="lastName"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Last name"
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
                {t('iAccept')}{" "}
                <a
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  href="#"
                >
                   {t('theTermsAndConditions')}
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
            {t('createAnAccount')}
            <div className='btn_loading'>
              <Spin indicator={antIcon} />
            </div>
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {t('alreadyHaveAnAccount')}?{" "}
            <a
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              {t('loginHere')}
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

export default memo(Register)
