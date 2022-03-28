import React from "react";
import { useSelector } from "react-redux";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function MyApplications() {
  const auth = useSelector((state) => state.auth);
  const { user } = auth;
  const app = user.applicationStatus;

  return (
    <div className="mt-12">
      <div className="card">
        <DataTable
          className="overflow-y-auto w-[400px] h-[350px]"
          value={app}
          responsiveLayout="scroll"
        >
          <Column field="job_title" header="İlan Başlığı"></Column>
          <Column field="job_status" header="Değerlendirme Durumu"></Column>
        </DataTable>
      </div>
    </div>
  );
}
