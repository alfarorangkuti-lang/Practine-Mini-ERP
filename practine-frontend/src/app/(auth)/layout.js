import AuthCard from "./authCard"

export default function LayoutAuth({children}){
    return(
        <div className="w-full h-screen flex items-center justify-center bg-gray-100 ">
            <AuthCard>
                { children }
            </AuthCard>
        </div>
    )
}