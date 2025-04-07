"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useUsers } from "../../../../hooks/useUsers";

export default function NewUserPage() {
  const router = useRouter();
  const { register, loading, handleSubmit, createUser } = useUsers();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Create New User</h1>
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 flex items-center"
        >
          <IoArrowBack className="w-4 h-4 mr-1" />
          Back
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-8">
        <form
          onSubmit={handleSubmit(createUser)}
          className="space-y-8"
          autoComplete="off"
        >
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                autoComplete="off"
                className="mt-1 block w-full h-12 px-4 rounded-md border border-gray-300 text-blue-600 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("name")}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                autoComplete="off"
                className="mt-1 block w-full h-12 px-4 rounded-md border border-gray-300 text-blue-600 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("email")}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full h-12 px-4 rounded-md border border-gray-300 text-blue-600 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("password")}
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                autoComplete="new-password"
                className="mt-1 block w-full h-12 px-4 rounded-md border border-gray-300 text-blue-600 text-base shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                {...register("confirmPassword")}
              />
            </div>
          </div>

          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("isActive")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  Active
                </span>
              </label>
            </div>

            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  {...register("isAdmin")}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  Admin
                </span>
              </label>
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-white py-3 px-6 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white py-3 px-6 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center text-base font-medium"
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Creating...
                </>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
