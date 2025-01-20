function PersonalDetails({ fetchedData }: any) {
  return (
    <div>
      <div className="flex gap-3">
        <p className="personal-details-item">First Name:</p>
        <p className="personal-details-item-p">
          {fetchedData?.first_name ? fetchedData?.first_name : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Last Name:</p>
        <p className="personal-details-item-p">
          {fetchedData?.surname ? fetchedData?.surname : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Gender:</p>
        <p className="personal-details-item-p">
          {fetchedData?.gender ? fetchedData?.gender : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">DOB:</p>
        <p className="personal-details-item-p">
          {fetchedData?.dob ? fetchedData?.dob : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Skills:</p>
        <p className="personal-details-item-p">
          {fetchedData?.skills ? fetchedData?.skills : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Languages:</p>
        <p className="personal-details-item-p">
          {fetchedData?.languages ? fetchedData?.languages : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Device Type:</p>
        <p className="personal-details-item-p">
          {fetchedData?.device_type ? fetchedData?.device_type : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Description:</p>
        <p className="personal-details-item-p">
          {fetchedData?.description ? fetchedData?.description : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Education:</p>
        <p className="personal-details-item-p">
          {fetchedData?.education ? fetchedData?.education : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Location:</p>
        <p className="personal-details-item-p">
          {fetchedData?.location ? fetchedData?.location : "N/A"}
        </p>
      </div>
      <div className="flex gap-3">
        <p className="personal-details-item">Sources:</p>
        <p className="personal-details-item-p">
          {fetchedData?.sources ? fetchedData?.sources : "N/A"}
        </p>
      </div>
    </div>
  );
}

export default PersonalDetails;
