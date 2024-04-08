"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { UploadCloudIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

const formSchema = z.object({
  title: z.string({ message: "This field is required" }).min(2, {
    message: "title must be at least 2 characters.",
  }),
  description: z.string({ message: "This field is required" }).min(2, {
    message: "description must be at least 2 characters.",
  }),
  price: z.string({ message: "This field is required" })
    .regex(/^[0-9]+$/, "price must be a number.")
    .min(1, {
      message: "price must be at least 1 characters.",
    }),
})

export default function SellForm() {
  const [base64File, setBase64File] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: ""
    },
  })

  function onSubmit(values) {
    if (!base64File) return toast.error("Please upload a cover image.")

    setIsLoading(true)

    const data = {
      ...values,
      price: parseInt(values.price),
      image: base64File
    }

    axios.post("/api/createAd", data).then(() => {
      toast.success("Ad created successfully.")
    }).catch(e => {
      console.log(e)
      toast.error("Failed to create an ad for your book.")
    }).finally(() => {
      setIsLoading(false)
    })
  }

  function getBase64(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setBase64File(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is the title of your book.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} placeholder="" {...field} />
                </FormControl>
                <FormDescription>
                  This is the price for your book in INR.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input disabled={isLoading} placeholder="" {...field} />
              </FormControl>
              <FormDescription>
                This is the description of your book.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <div className="flex items-center justify-center w-full">
            <label htmlFor="image" className="cursor-pointer w-full relative">
              <FormLabel>Cover Image</FormLabel>

              {!!base64File ? (
                <div className="my-4 relative overflow-hidden w-full pt-[56.25%] rounded-md border bg-muted transition-colors">
                  <Image
                    src={
                      (base64File) ||
                      "/images/cover.png"
                    }
                    alt="alt"
                    fill
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-lg ">
                  <div className="flex flex-col items-center justify-center py-10 px-20">
                    <UploadCloudIcon className="mb-2 h-7 w-7" />
                    <div className="text-gray-400">
                      Click or drag file to this area to upload
                    </div>
                  </div>
                </div>
              )}
              <input
                id="image"
                name="image"
                accept="image/*"
                type="file"
                className="invisible absolute inset-0"
                disabled={isLoading}
                onChange={(e) => {
                  if (e.target.files) {
                    const file = e.target.files[0];
                    getBase64(file);
                  }
                }}
              />
            </label>
          </div>
        </div>
        <Button disabled={isLoading} type="submit">Submit</Button>
      </form>
    </Form>
  )
}
