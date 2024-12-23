import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { dropSubjects, getSubjectById, getSubjects } from "@/app/api/data/subjects/subjects";
import FormSubject from "./FormSubject";
import PopupNotification from "../ui/PopupNotification";

interface Subject {
  subject_id: number;
  name: string;
  description: string;
}

export default function TableData() {
  const [activeForm, setActiveForm] = useState(false);
  const [subject, setSubject] = useState<Subject[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [data,setData] = useState<Subject | null>(null);;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const [message, setMessage] = useState("");
  const [messageError, setMessageError] = useState("");

  const handleForm = async () => {
    setData(null);
    setActiveForm((prev) => !prev);
  };


  const handleUpdate = async (id:any) => {
    setActiveForm(false);
    try{
      const data = await getSubjectById(id);
      setData(data.subject);
    }catch(error){
      console.error("Unexpected error:", error);
    }
  }



  const handleDelete = async (id: number) => {
    try {
      const drop = await dropSubjects(id);
      console.log(drop);
      setIsOpen(false);
      getSubject();
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  const getSubject = async () => {
    setData(null);
    try {
      const data = await getSubjects();
      setSubject(data.subjects);
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  };

  useEffect(() => {
    getSubject();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSubjects = subject.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(subject.length / itemsPerPage);

  return (
    <>
      <div className="bg-white m-6 rounded-xl relative">
        {activeForm ? (
          <div className="w-full my-6">
            <FormSubject onSuccess={getSubject} />
            
          </div>
        ) : (
          <></>
        )}
        {data ? (
          <div className="w-full my-6">
            <FormSubject onSuccess={getSubject}  initialData={{ id: data.subject_id , name: data.name, description: data.description }} />
          </div>
        ) : (
          <></>
        )}
        <h2 className="text-xl font-semibold text-black mb-4">Data Subjects</h2>
        <table className="w-full text-left  border rounded-sm ">
          <thead className="w-full">
            <tr className="w-full">
              <th className="border-b p-2 w-1/6">ID</th>
              <th className="border-b p-2 w-2/6">Nama</th>
              <th className="border-b p-2 w-2/6">Deskripsi</th>
              <th className="border-b py-2 w-1/6 px-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentSubjects.map((data, index) => (
              <tr key={data.subject_id}>
                <td className="border-b p-2">{indexOfFirstItem + index + 1}</td>{" "}
                {/* Adjust index */}
                <td className="border-b p-2">{data.name}</td>
                <td className="border-b p-2">{data.description}</td>
                <td className="border-b p-2 w-auto flex justify-end gap-2 ">
                  <Button
                    className="my-3"
                    variant="danger"
                    onClick={handleOpen}
                    size="sm"
                  >
                    Delete
                  </Button>
                  <PopupNotification
                    isOpen={isOpen}
                    onClose={handleClose}
                    onConfirm={() => handleDelete(data.subject_id)} // The onClick function will be called when the button is clicked
                    title="Anda yakin untuk hapus data ini?"
                    message="Ini mungkin akan mempengruhi beberapa data lainnya"
                    variant="delete"
                    confirmButtonText="Ya, Hapus!"
                    cancelButtonText="Tidak, Kembali!"
                  />
                  <Button
                    className="my-3"
                    variant="success"
                    onClick={() => handleUpdate(data.subject_id)}
                    size="sm"
                  >
                    Update
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {message && <p className="mt-4 text-sm text-green-500">{message}</p>}
        {messageError && (
          <p className="mt-4 text-sm text-red-600">{messageError}</p>
        )}
        <div className="flex justify-between items-center mt-4">
          <Button
            className="my-3"
            variant="primary"
            onClick={handleForm}
            size="md"
          >
            Add Data
          </Button>

          {/* Pagination Controls */}
          <div className="flex gap-2 items-center text-center">
            <Button
              variant="secondary"
              onClick={() => paginate(currentPage - 1)}
              size="md"
              disabled={currentPage === 1}
            >
              Previus
            </Button>

            <span className="px-4 py-1 border border-slate-600 rounded-sm">{currentPage}</span>
            <Button
              variant="primary"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Previus
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
