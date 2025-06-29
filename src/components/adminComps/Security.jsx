export default function Security() {
  return (
    <div className="flex flex-col gap-4">
      <div className="verify">
        <label
          htmlFor="verify"
          className="block mb-1 ml-1 text-sm font-medium text-gray-900"
        >
          Verify email address
        </label>
        <input
          type="text"
          id="verify"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter verification code sent to your email"
          required
        />
      </div>
      <div className="password">
        <label
          htmlFor="password"
          className="block mb-1 ml-1 text-sm font-medium text-gray-900"
        >
          Update password
        </label>
        <input
          type="password"
          id="password"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter new password"
          required
        />
        <input
          type="password"
          id="confirmPassword"
          className="block w-full mt-6 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500"
          placeholder="Confirm new password"
          required
        />
      </div>
      <button className="w-fit  bg-sky-400 hover:bg-sky-500 text-black font-bold py-1 px-4 rounded">
        Save
      </button>
    </div>
  );
}
