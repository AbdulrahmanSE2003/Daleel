import Form from "../LoginSections/Form";
function LoginHalf({ onSwitch }) {
  return (
    <div className="bg-gray-100 w-full h-screen ps-8 md:ps-16 p-8 mb-14 md:mb-0 flex flex-col justify-start items-between gap-6">
      <h3 className="text-4xl font-semibold italic text-gray-800 mb-2">
        Welcome Back!
      </h3>
      <p className="text-gray-700">
        <q>
          Sign in to access your personal space and keep all your links
          organized, secure, and easy to manage.
        </q>
      </p>
      <Form onSwitch={onSwitch} />
    </div>
  );
}

export default LoginHalf;
