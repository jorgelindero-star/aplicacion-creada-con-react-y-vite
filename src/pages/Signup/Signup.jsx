import alterpaylogo from "@/assets/alterpay.jpeg";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { registerUserService } from "@/service/userService";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log("datos a enviar: ", data); //hacemos debug (ver datos en consola)
    try {
      const response = await registerUserService(data);
      if (response.status === 201) {
        // le damos feedback al usuario
        toast.success("🎉 Usuario registrado exitosamente");
        navigate("/login");
      } else {
        toast.error("❌ Error al registrar usuario");
      }
    } catch (error) {
      console.log("Ocurrio un error en signup:", error); // para hacer debug
      toast.error(error.message || "Error al registrar usuario"); // feedback al usuario
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-10 bg-white rounded-xl shadow-xl border border-gray-200">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-500">
        <span className="inline-flex items-center justify-center gap-2">
          <img
            src={alterpaylogo}
            alt="Alterpay Logo"
            className="w-25 h-10"
          />
          Crear Cuenta
        </span>
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Nombre
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="Nombre"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ease-in-out duration-200"
              {...register("first_name", {
                required: "El nombre es obligatorio",
              })}
            />
            {errors.first_name && (
              <p className="text-sm text-red-600">
                {errors.first_name.message}{" "}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Apellido
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Apellido"
              className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ease-in-out duration-200"
              {...register("last_name", {
                required: "El apellido es obligatorio",
              })}
            />
            {errors.last_name && (
              <p className="text-sm text-red-600">{errors.last_name.message}</p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="gender"
            className="block text-gray-700 font-medium mb-2"
          >
            Género
          </label>
          <select
            id="gender"
            {...register("gender", {
              required: "Selecciona un género",
            })}
            className={`block w-full rounded-md border border-gray-300 bg-white
       px-3 py-2 shadow-sm 
       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
       ${errors.gender ? "border-red-500" : ""}
       transition ease-in-out duration-150
       `}
          >
            <option value="">Elige...</option>
            <option value="M">Hombre</option>
            <option value="F">Mujer</option>  
            <option value="O">binario</option>
          </select>
          {errors.gender && (
            <p className="text-sm text-red-600">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ease-in-out duration-200"
            {...register("email", {
              required: "El correo electrónico es obligatorio",
            })}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-600 mb-1"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none transition ease-in-out duration-200"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition duration-200"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Signup;
