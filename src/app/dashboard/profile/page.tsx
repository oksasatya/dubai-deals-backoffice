"use client";

import {useRouter} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/app/redux/slices/hooks";
import React, {useEffect, useRef, useState} from "react";
import {getToken} from "@/app/utils/cookies";
import {fetchUserProfile, setUserData} from "@/app/redux/slices/userSlice";
import LoadingSpinner from "@/app/dashboard/components/loadingSpinner";
import toast from "react-hot-toast";
import {Calendar, Camera, Edit, Mail, MapPin, Phone, Save, X} from "lucide-react";
import Image from 'next/image';
import {updateUserProfile} from "@/app/services/authService";

interface ProfileFormData {
    name: string;
    email: string;
    phone: string;
    age: number;
    address: string;
    avatar: string;
}

interface ValidationErrors {
    name?: string;
    email?: string;
    phone?: string;
    age?: string;
    address?: string;
    avatar?: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const {data: userData, loading, error} = useAppSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [isAvatarHovered, setIsAvatarHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<ProfileFormData>({
        name: "",
        email: "",
        phone: "",
        age: 0,
        address: "",
        avatar: "",
    });

    const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/");
            return;
        }

        (async () => {
            try {
                await dispatch(fetchUserProfile());
            } catch (e) {
                console.error("failed fetch user profile ! ", e);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [dispatch, router]);

    useEffect(() => {
        if (userData) {
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                age: userData.age || 0,
                address: userData.address || "",
                avatar: userData.avatar || "",
            });
        }
    }, [userData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: name === "age" ? parseInt(value) || 0 : value,
        });
    };

    const validate = (): boolean => {
        const newErrors: ValidationErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required";
        }

        if (formData.age <= 0) {
            newErrors.age = "Age must be greater than 0";
        }

        if (!formData.address.trim()) {
            newErrors.address = "Address is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsSaving(true);

        try {
            const updatedUser = await updateUserProfile(formData);
            dispatch(setUserData(updatedUser.data));
            setIsEditing(false);
            toast.success("Profile updated successfully");
        } catch (e) {
            console.error("Failed to update profile", e);
            toast.error("Failed to update profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            toast.error('Please select an image file');
            return;
        }

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size should be less than 2MB');
            return;
        }

        const objectUrl = URL.createObjectURL(file);

        setFormData({
            ...formData,
            avatar: objectUrl
        });

        const formDataObj = new FormData();
        formDataObj.append('avatar', file);

        try {
            setIsSaving(true);

            const updatedUser = await updateUserProfile({
                ...formData,
                avatar: objectUrl
            });

            dispatch(setUserData(updatedUser.data));
            toast.success('Avatar updated successfully');
        } catch (error) {
            console.error('Failed to update avatar:', error);
            toast.error('Failed to update avatar');

            setFormData({
                ...formData,
                avatar: userData?.avatar || ""
            });
        } finally {
            setIsSaving(false);
        }
    };

    const toggleEditMode = () => {
        if (isEditing) {
            setFormData({
                name: userData?.name || "",
                address: userData?.address || "",
                age: userData?.age || 0,
                email: userData?.email || "",
                phone: userData?.phone || "",
                avatar: userData?.avatar || "",
            });
            setErrors({});
        }
        setIsEditing(!isEditing);
    };

    if (isLoading || loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary mb-4">Profile</h1>
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Error loading profile: {error}</p>
                </div>
            </div>
        );
    }

    if (!userData) {
        return (
            <div className="p-6">
                <h1 className="text-2xl font-bold text-primary mb-4">Profile</h1>
                <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                    <p>No Profile Data Available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-primary">User Profile</h1>

                {isEditing ? (
                    <div className="flex gap-2">
                        <button
                            onClick={toggleEditMode}
                            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md transition-colors cursor-pointer"
                        >
                            <X size={18}/>
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={isSaving}
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors cursor-pointer"
                        >
                            {isSaving ? (
                                <>
                                    <span
                                        className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <>
                                    <Save size={18}/>
                                    Save Changes
                                </>
                            )}
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={toggleEditMode}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 py-2 text-white px-4 rounded-md transition-colors cursor-pointer"
                    >
                        <Edit size={18}/>
                        Edit Profile
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Summary card */}
                <div className="md:col-span-1 bg-white rounded-lg shadow p-6">
                    <div className="flex flex-col items-center">
                        {/* Avatar with hover effect */}
                        <div
                            className="w-24 h-24 rounded-full relative overflow-hidden cursor-pointer"
                            onMouseEnter={() => setIsAvatarHovered(true)}
                            onMouseLeave={() => setIsAvatarHovered(false)}
                            onClick={handleAvatarClick}
                        >
                            {formData.avatar ? (
                                <>
                                    <Image
                                        src={formData.avatar}
                                        alt={`Profile of ${formData.name}`}
                                        width={96}
                                        height={96}
                                        className="w-24 h-24 rounded-full object-cover"
                                    />
                                    {/* Overlay edit avatar */}
                                    <div
                                        className={`absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-full transition-opacity duration-200 ${
                                            isAvatarHovered ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <Camera size={20} className="text-white mb-1"/>
                                        <span className="text-white text-xs font-medium">Edit Avatar</span>
                                    </div>
                                </>
                            ) : (
                                <div
                                    className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center relative">
                                    <span className="text-3xl font-bold text-blue-600">
                                        {formData.name.charAt(0)}
                                    </span>
                                    {/* Overlay edit avatar */}
                                    <div
                                        className={`absolute inset-0 bg-black bg-opacity-60 flex flex-col items-center justify-center rounded-full transition-opacity duration-200 ${
                                            isAvatarHovered ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    >
                                        <Camera size={20} className="text-white mb-1"/>
                                        <span className="text-white text-xs font-medium">Edit Avatar</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Hidden file input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                        />

                        <h2 className="text-xl font-bold mt-4">{formData.name}</h2>
                        <p className="text-gray-500 mb-4">{formData.email}</p>
                        <div className="w-full border-t border-gray-200 my-4">
                            <div className="w-full">
                                <div className="flex items-center gap-3 mb-3 mt-4">
                                    <Phone size={18} className="text-gray-500"/>
                                    <span>{formData.phone}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar size={18} className="text-gray-500"/>
                                    <span>{formData.age} Years Old</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-4">
                        {isEditing ? 'Edit Profile' : 'Contact Information'}
                    </h3>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div>
                                <div className="mb-4">
                                    <label htmlFor="name" className="block text-gray-500 text-sm mb-1">
                                        Full Name
                                    </label>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus-blue ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                        </>
                                    ) : (
                                        <p className="font-medium">{formData.name}</p>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-gray-500 text-sm mb-1">
                                        Email Address
                                    </label>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus-blue ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.email &&
                                                <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Mail size={18} className="text-gray-500"/>
                                            <p className="font-medium">{formData.email}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="phone" className="block text-gray-500 text-sm mb-1">
                                        Phone Number
                                    </label>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus-blue ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.phone &&
                                                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <Phone size={18} className="text-gray-500"/>
                                            <p className="font-medium">{formData.phone}</p>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="age" className="block text-gray-500 text-sm mb-1">Age</label>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="number"
                                                id="age"
                                                name="age"
                                                value={formData.age}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus-blue ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
                                        </>
                                    ) : (
                                        <p className="font-medium">{formData.age} Years</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="address"
                                           className="block text-gray-500 text-sm mb-1">Address</label>
                                    {isEditing ? (
                                        <>
                                            <input
                                                type="text"
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 border rounded-md focus-blue ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                                            />
                                            {errors.address &&
                                                <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                                        </>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0"/>
                                            <p className="font-medium">{formData.address}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {isEditing && (
                            <button type="submit" className="hidden">Submit</button>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}