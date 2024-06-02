import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";

interface User {
    ID: string;
    JobTitle: string;
    EmailAddress: string;
    FirstNameLastName: string;
    Email: string;
    Phone: string;
    Company: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get(
                `https://give-me-users-forever.vercel.app/api/users/${currentPage}/next`
            );
            setUsers(
                response.data.users === "No users Left"
                    ? []
                    : response.data.users
            );
            setTotalPages(
                response.data.users === "No users Left"
                    ? currentPage
                    : currentPage + 20
            );
        };

        fetchUsers();
    }, [currentPage]);

    return (
        // <div className="container mx-auto p-4">
        //     <h1 className="text-2xl font-bold mb-4">User List</h1>
        //     <ul className="space-y-4">
        //         {users.map((user) => (
        //             <li
        //                 key={user.ID}
        //                 className="border p-4 rounded shadow-md bg-white"
        //             >
        //                 <h2 className="text-xl font-semibold">
        //                     {user.FirstNameLastName}
        //                 </h2>
        //                 <p>
        //                     <span className="font-semibold">Email:</span>{" "}
        //                     {user.EmailAddress}
        //                 </p>
        //                 <p>
        //                     <span className="font-semibold">Company:</span>{" "}
        //                     {user.Company}
        //                 </p>
        //                 <p>
        //                     <span className="font-semibold">Job Title:</span>{" "}
        //                     {user.JobTitle}
        //                 </p>
        //                 <p>
        //                     <span className="font-semibold">Phone:</span>{" "}
        //                     {user.Phone}
        //                 </p>
        //             </li>
        //         ))}
        //     </ul>
        //     <Pagination
        //         currentPage={currentPage}
        //         totalPages={totalPages}
        //         onPageChange={setCurrentPage}
        //     />
        // </div>
        <div className="container mx-auto p-4 h-screen flex flex-col">
            <div className="flex justify-between mb-4">
                <div className="w-full"></div>
                <h1 className="text-2xl font-bold w-full">User List</h1>
                <div className="w-full flex justify-end">
                    <button className="px-2 py-1 bg-gray-800 text-white rounded">
                        <a
                            href="https://github.com/100RAV-AGGARWAL/EnableIT-assessment"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Github
                        </a>
                    </button>
                </div>
            </div>
            <div className="shadow-lg p-5 rounded flex-1 overflow-auto">
                {users && users.length > 0 ? (
                    <ul className="space-y-4">
                        {users?.map((user) => (
                            <li
                                key={user.ID}
                                className="border p-4 rounded bg-white"
                            >
                                <h2 className="text-xl font-semibold">
                                    {user.FirstNameLastName}
                                </h2>
                                <p>
                                    <span className="font-semibold">
                                        Email Address:
                                    </span>{" "}
                                    {user.EmailAddress}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Email:
                                    </span>{" "}
                                    {user.Email}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Company:
                                    </span>{" "}
                                    {user.Company}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Job Title:
                                    </span>{" "}
                                    {user.JobTitle}
                                </p>
                                <p>
                                    <span className="font-semibold">
                                        Phone:
                                    </span>{" "}
                                    {user.Phone}
                                </p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No Users Left</p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default UserList;
