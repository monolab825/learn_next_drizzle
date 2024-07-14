"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Session } from "next-auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SettingsSchema } from "@/types/settings-schema"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import FormError from "@/components/auth/form-error"
import FormSuccess from "@/components/auth/form-success"
import { useState } from "react"

type SettingsProp = {
    session: Session
}

export default function SettingsCard(session: SettingsProp) {
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [avatarUploading, setAvatarUploading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof SettingsSchema>>({
        resolver: zodResolver(SettingsSchema),
        defaultValues: {
            name: session.session.user?.name || undefined,
            email: session.session.user?.email || undefined,
            // isTwoFactorEnabled: session.session.user?.isTwoFactorEnabled || undefined,
        }
    });

    const onSubmit = (value: z.infer<typeof SettingsSchema>) => {
        // execute(values)
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full lg:w-2/3 space-y-6">
                        {/* Name */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Did" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Avatar */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Avatar</FormLabel>
                                    <div className="flex">
                                        <Avatar>
                                            {form.getValues('image') && (
                                                <AvatarImage src={form.getValues('image')!} width={42}/>
                                            )}
                                            {!form.getValues('image') && (
                                                <AvatarFallback className="bg-primary/25">
                                                    <div className="font-bold">
                                                        {session.session.user?.name?.charAt(0).toUpperCase()}
                                                    </div>
                                                </AvatarFallback>
                                            )}
                                        </Avatar>
                                    </div>
                                    <FormControl>
                                        <Input type="hidden" placeholder="User image" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* New Password */}
                        <FormField
                            control={form.control}
                            name="newPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>New Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* Two Factor Enable */}
                        <FormField
                            control={form.control}
                            name="isTwoFactorEnabled"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Two Factor Auth</FormLabel>
                                    <FormControl>
                                        <Switch />
                                    </FormControl>
                                    <FormDescription>
                                        Enable two factor authentication
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormError />
                        <FormSuccess />
                        <Button disabled={status === 'executing' || avatarUploading} type="submit">Update Settings</Button>
                    </form>
                </Form>


            </CardContent>
            <CardFooter>
                {/*  */}
            </CardFooter>
        </Card>
    )
}