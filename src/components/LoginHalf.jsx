import Form from "../components/Form";
function LoginHalf({ onSwitch }) {
  return (
    <div className="bg-gray-50 w-full h-full ps-16 p-10  flex flex-col justify-start  items-between gap-6">
      <h3 className="text-4xl font-semibold italic text-gray-800 mb-4">
        Welcome Back!
      </h3>
      <p className="text-gray-700">
        <q>
          Sign in to start organizing all your links in one place. Your personal
          Daleel space is waiting—fast, secure, and simple.
        </q>
      </p>
      <Form onSwitch={onSwitch} />
    </div>
  );
}

export default LoginHalf;
