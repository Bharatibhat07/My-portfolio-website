

import { useEffect, useState, type ComponentType } from "react";
import {
  Award,
  Lightbulb,
  Brain,
  BookCheck,
  X,
  Trophy,
  Star,
  Zap,
  Target,
  Code2,
  Bug,
  Flame,
  Plus,
} from "lucide-react";

type CertificateStatus = "Completed" | "In Progress" | "Planned";

type Certificate = {
  _id: string;
  title: string;
  status: CertificateStatus;
  issuer: string;
  certificateFile?: string;
  credentialUrl?: string;
  date: string;
  icon?: ComponentType<{ size?: number; className?: string }>;
  desc: string;
};

type CertificateFormState = {
  title: string;
  status: CertificateStatus;
  issuer: string;
  description: string;
  issueDate: string;
  file: File | null;
};

const achievements = [
  {
    icon: Award,
    title: "Academic Excellence",
    desc: "CGPA: 9.0/10 in Computer Science Engineering",
  },
  {
    icon: Lightbulb,
    title: "Project-Based Learning",
    desc: "Built a Campus Grievance Redressal Portal with full-stack architecture",
  },
  {
    icon: Brain,
    title: "Problem Solving",
    desc: "Actively practicing DSA on LeetCode to improve logical skills",
  },
];

const pickIcon = (
  title: string
): ComponentType<{ size?: number; className?: string }> => {
  const normalized = title.toLowerCase();

  if (normalized.includes("java") || normalized.includes("programming"))
    return Zap;

  if (normalized.includes("workshop") || normalized.includes("full stack"))
    return Trophy;

  if (normalized.includes("soft")) return Target;

  if (
    normalized.includes("pointer") ||
    normalized.includes("data structure")
  )
    return Code2;

  if (normalized.includes("bug") || normalized.includes("debug"))
    return Bug;

  if (normalized.includes("hack") || normalized.includes("matrix"))
    return Flame;

  return Star;
};

const formatIssueDate = (value: unknown): string => {
  if (!value) return "N/A";

  const date = new Date(value as string);

  if (Number.isNaN(date.getTime())) {
    return typeof value === "string" ? value : "N/A";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};


const toUiCertificate = (
  item: Record<string, unknown>
): Certificate => {
  const title =
    typeof item.title === "string"
      ? item.title
      : "Certificate";

  const statusValue =
    typeof item.status === "string"
      ? item.status
      : "Completed";

  const status: CertificateStatus =
    statusValue === "In Progress"
      ? "In Progress"
      : statusValue === "Planned"
        ? "Planned"
        : "Completed";


  const issuer =
    typeof item.issuer === "string"
      ? item.issuer
      : "Added via backend";


  const issueDate =
    typeof item.issueDate === "string"
      ? item.issueDate
      : undefined;


  // FIX: Convert backend relative URL to Render URL
  const backendCredentialUrl =
    typeof item.credentialUrl === "string"
      ? item.credentialUrl
      : undefined;


  const credentialUrl =
  backendCredentialUrl
    ? backendCredentialUrl.startsWith("/api")
      ? `${import.meta.env.VITE_API_URL}${backendCredentialUrl}`
      : backendCredentialUrl
    : undefined;


  const certificateFile =
    typeof item.certificateFile === "string"
      ? item.certificateFile
      : credentialUrl;


  const rawDescription =
    typeof item.description === "string"
      ? item.description
      : typeof item.desc === "string"
        ? item.desc
        : "";


  const description =
    rawDescription.trim()
      ? rawDescription
      : title;


  return {
    _id:
      typeof item._id === "string"
        ? item._id
        : `${title}-${Date.now()}`,

    title,
    status,
    issuer,

    certificateFile,
    credentialUrl,

    date: formatIssueDate(issueDate),

    icon: pickIcon(title),

    desc: description,
  };
};
const AchievementsSection = () => {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [selectedCertificate, setSelectedCertificate] =
    useState<string | null>(null);

  const [selectedCertificateType, setSelectedCertificateType] =
    useState<"image" | "pdf" | null>(null);

  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [form, setForm] = useState<CertificateFormState>({
    title: "",
    status: "Completed",
    issuer: "",
    description: "",
    issueDate: "",
    file: null,
  });


  // LOAD CERTIFICATES FROM RENDER BACKEND
  useEffect(() => {
    const loadCertificates = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/certificates`,
          {
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch certificates");
        }

        const data = await res.json();

        if (Array.isArray(data)) {
          setCertificates(
            data.map((item) =>
              toUiCertificate(item as Record<string, unknown>)
            )
          );
        } else {
          setCertificates([]);
        }

      } catch (error) {
        console.error(
          "Could not load certificates from backend",
          error
        );
      }
    };


    loadCertificates();

  }, []);



  const isPdfFile = (filePath: string) =>
    filePath.toLowerCase().endsWith(".pdf");


  const buildPreviewUrl = (filePath: string) =>
    filePath.replace("/download/", "/preview/");



  
  const showCertificateFile = (filePath: string) => {
  const previewUrl = buildPreviewUrl(filePath);

  if (isPdfFile(previewUrl)) {
    window.open(previewUrl, "_blank", "noopener,noreferrer");
    return;
  }

  setSelectedCertificate(previewUrl);
  setSelectedCertificateType("image");
};



  const closeCertificateModal = () => {
    setSelectedCertificate(null);
    setSelectedCertificateType(null);
  };



  // UPLOAD CERTIFICATE TO RENDER BACKEND
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setUploading(true);
    setFeedback(null);



    const payload = new FormData();

    payload.append("title", form.title);
    payload.append("status", form.status);
    payload.append("issuer", form.issuer);
    payload.append("description", form.description);


    if (form.issueDate) {
      payload.append(
        "issueDate",
        form.issueDate
      );
    }


    if (form.file) {
      payload.append(
        "certificateFile",
        form.file
      );
    }



    try {

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/certificates`,
        {
          method: "POST",
          body: payload,
        }
      );



      if (!res.ok) {
        throw new Error(
          "Unable to save certificate"
        );
      }



      const result = await res.json();


      const backendCertificate =
        result.certificate as
        Record<string, unknown> | undefined;



      const backendUrl =
  typeof backendCertificate?.credentialUrl === "string"
    ? backendCertificate.credentialUrl.startsWith("/api")
      ? `${import.meta.env.VITE_API_URL}${backendCertificate.credentialUrl}`
      : backendCertificate.credentialUrl
    : undefined;



      const newCertificate: Certificate = {

        _id:
          typeof backendCertificate?._id === "string"
            ? backendCertificate._id
            : `new-${Date.now()}`,


        title: form.title,

        status: form.status,

        issuer: form.issuer,


        certificateFile: backendUrl,

        credentialUrl: backendUrl,


        date: form.issueDate
          ? new Date(form.issueDate)
              .toLocaleDateString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }
              )
          : "N/A",


        icon: pickIcon(form.title),

        desc:
          form.description.trim() ||
          form.title,
      };



      setCertificates((prev) => [
        newCertificate,
        ...prev,
      ]);



      setFeedback(
        "Certificate saved successfully."
      );



      setForm({
        title: "",
        status: "Completed",
        issuer: "",
        description: "",
        issueDate: "",
        file: null,
      });



    } catch (error) {

      console.error(
        "Could not upload certificate",
        error
      );


      setFeedback(
        "Failed to save certificate. Check backend."
      );


    } finally {

      setUploading(false);

    }

  };
    return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-4">

        <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4 neon-text">
          Achievements & Certifications
        </h2>

        <p className="text-muted-foreground text-center mb-12 max-w-md mx-auto">
          Milestones on my journey
        </p>


        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">

          {achievements.map((a) => (

            <div
              key={a.title}
              className="glass-card-hover p-6 text-center"
            >

              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-neon-purple/20 flex items-center justify-center">

                <a.icon
                  size={24}
                  className="text-neon-purple"
                />

              </div>


              <h3 className="font-heading font-semibold text-lg mb-2">
                {a.title}
              </h3>


              <p className="text-sm text-muted-foreground">
                {a.desc}
              </p>

            </div>

          ))}

        </div>



        <div className="max-w-5xl mx-auto mb-12 rounded-2xl border border-glass-border bg-background/70 p-6 shadow-lg">


          <div className="flex items-center gap-2 mb-4">

            <Plus
              size={18}
              className="text-neon-purple"
            />

            <h3 className="text-xl font-heading font-semibold">
              Add a new certificate
            </h3>

          </div>



          <p className="text-sm text-muted-foreground mb-6">
            Upload a certificate and save it to the backend.
          </p>



          <form
            onSubmit={handleSubmit}
            className="grid gap-4 md:grid-cols-2"
          >


            <input
              required
              value={form.title}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              placeholder="Certificate title"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border"
            />



            <select
              value={form.status}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  status:
                    e.target.value as CertificateStatus,
                }))
              }
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border"
            >

              <option value="Completed">
                Completed
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Planned">
                Planned
              </option>

            </select>




            <input
              required
              value={form.issuer}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  issuer: e.target.value,
                }))
              }
              placeholder="Issuer"
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border"
            />



            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  file:
                    e.target.files?.[0] || null,
                }))
              }
              className="w-full rounded-lg border border-dashed border-glass-border bg-muted px-4 py-3"
            />



            <input
              type="date"
              value={form.issueDate}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  issueDate: e.target.value,
                }))
              }
              className="w-full px-4 py-3 rounded-lg bg-muted border border-glass-border"
            />



            <textarea
              required
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Description"
              rows={3}
              className="md:col-span-2 w-full px-4 py-3 rounded-lg bg-muted border border-glass-border"
            />



            <div className="md:col-span-2 flex items-center gap-3">

              <button
                type="submit"
                disabled={uploading}
                className="btn-neon"
              >

                {uploading
                  ? "Saving..."
                  : "Save certificate"}

              </button>



              {feedback && (
                <p className="text-sm text-neon-blue">
                  {feedback}
                </p>
              )}

            </div>


          </form>

        </div>





        <h3 className="text-2xl font-heading font-semibold text-center mb-12">
          Professional Certifications
        </h3>





        <div className="flex gap-6 overflow-x-auto pb-4 px-4">


          {certificates.map((c) => {

            const CertIcon =
              c.icon || BookCheck;


            return (

              <div
                key={c._id}
                className="flex-shrink-0 w-80 rounded-xl border border-glass-border bg-gradient-to-br from-neon-purple/10 to-neon-blue/10 p-8"
              >


                <CertIcon
                  size={32}
                  className="mb-4"
                />


                <h4 className="text-lg font-bold mb-2">
                  {c.title}
                </h4>


                <p className="text-neon-blue mb-3">
                  {c.issuer}
                </p>


                <p className="mb-5">
                  {c.desc}
                </p>
{(c.certificateFile || c.credentialUrl) && (
  <div className="flex gap-3">
    <button
      onClick={() =>
        showCertificateFile(
          c.certificateFile ||
          c.credentialUrl ||
          ""
        )
      }
      className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
    >
      View Certificate
    </button>

    <a
      href={
        (c.certificateFile || c.credentialUrl || "").replace(
          "/preview/",
          "/download/"
        )
      }
      download
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Download
    </a>
  </div>
)}


                
                


              </div>

            );

          })}


        </div>

        {selectedCertificate && (

          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">


            <div className="relative bg-background max-w-4xl w-full">


              <button
                onClick={closeCertificateModal}
                className="absolute right-4 top-4"
              >

                <X />

              </button>



              <img
                src={selectedCertificate}
                alt="Certificate"
                className="w-full max-h-[90vh] object-contain"
              />


            </div>


          </div>

        )}



      </div>
    </section>
  );
};


export default AchievementsSection;