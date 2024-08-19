"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {Form} from "@/components/ui/form"
import CustomFormField from "./CustomFormField"
import SubmitButton from "./SubmitButton"
import { useState } from "react"
import { userFormValidation } from "@/lib/Validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patient.action"

export enum FormFieldType {
 INPUT = 'input',
 CHECKBOX = 'checkbox',
 TEXTAREA = 'textarea',
 PHONE_INPUT = 'phoneInput',
 DATE_PICKER = 'datePicker',
 SELECT = 'select',
 SKELETON = 'skeleton'
}



const PatientForm = () => {

  const [isLoading,setIsLoading] = useState(false);
  const router = useRouter()  // 1. Define your form.
  const form = useForm<z.infer<typeof userFormValidation>>({
    resolver: zodResolver(userFormValidation),
    defaultValues: {
      name: "",
      email:'',
      phone:'',
    },
  })
 
 
  async function onSubmit({name,email,phone}: z.infer<typeof userFormValidation>) {
   setIsLoading(true);

   try {
     const userData = {name,email,phone};

    const user = await createUser(userData); 

     if(user) router.push(`/patients/${user.$id}/register`)
   } catch (error) {
    console.log(error);
   }finally{
    setIsLoading(false);
   }
  
  }
  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <section className="mb-12 space-y-4">
            <h1 className="header">Hi There 👋</h1>
            <p className="text-dark-700">Schedule an appointment</p>
        </section>
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name = 'name'
          label = 'Full Name'
          placeholder="John Doe"
          iconSrc="/assets/icons/user.svg"
          iconAlt="user" 
         />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.INPUT}
          name = 'email'
          label = 'Email'
          placeholder="johndoe@gmail.com"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email" 
         />
        <CustomFormField
          control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name = 'phoneNumber'
          label = 'Phone Number'
          placeholder="+254 *********"
          iconSrc="/assets/icons/email.svg"
          iconAlt="email" 
         />
        <SubmitButton className= 'shad-primary-btn w-full' isLoading={isLoading}>Get Started</SubmitButton>
        
      </form>
    </Form>
  )
}

export default PatientForm