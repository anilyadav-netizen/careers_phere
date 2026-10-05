import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Mail,
  Search,
  RefreshCw,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Inbox,
  Send,
  Calendar,
  Phone,
  User,
  MessageSquare,
  X,
  AlertTriangle,
  ChevronRight,
  Filter,
} from "lucide-react";
import StatCard from "../components/StateCard";
import Toast from "../components/Toast";
import {
  getAdminEnquiries,
  getEnquiryStats,
  updateEnquiryStatus,
  deleteEnquiry,
} from "../../redux/slicer/enquirySlice";

const Enquiries = () => {
  const dispatch = useDispatch();

  const {
    adminEnquiries = [],
    stats = { total: 0, new: 0, read: 0, replied: 0 },
    loading = false,
    updatingId = null,
    deletingId = null,
  } = useSelector((state) => state.enquiries || {});

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const loadData = useCallback(() => {
    dispatch(getAdminEnquiries({ search: searchTerm, status: statusFilter }));
    dispatch(getEnquiryStats());
  }, [dispatch, searchTerm, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle status update
  const handleStatusChange = async (id, newStatus) => {
    try {
      await dispatch(updateEnquiryStatus({ id, status: newStatus })).unwrap();
      showToast(`Status updated to ${newStatus}`);
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry((prev) => ({ ...prev, status: newStatus }));
      }
      dispatch(getEnquiryStats());
    } catch (err) {
      showToast(err || "Failed to update status", "error");
    }
  };

  // Handle delete
  const handleDeleteConfirm = async () => {
    if (!deletingItem) return;
    try {
      await dispatch(deleteEnquiry(deletingItem._id)).unwrap();
      showToast("Enquiry deleted successfully");
      setDeletingItem(null);
      if (selectedEnquiry && selectedEnquiry._id === deletingItem._id) {
        setSelectedEnquiry(null);
      }
      dispatch(getEnquiryStats());
    } catch (err) {
      showToast(err || "Failed to delete enquiry", "error");
    }
  };

  // View details modal
  const handleViewDetails = (enquiry) => {
    setSelectedEnquiry(enquiry);
    // If it was 'new', update status to 'read'
    if (enquiry.status === "new") {
      handleStatusChange(enquiry._id, "read");
    }
  };

  const filteredEnquiries = useMemo(() => {
    if (!Array.isArray(adminEnquiries)) return [];
    return adminEnquiries.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name?.toLowerCase().includes(q) ||
        item.email?.toLowerCase().includes(q) ||
        item.subject?.toLowerCase().includes(q) ||
        item.phone?.toLowerCase().includes(q) ||
        item.message?.toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [adminEnquiries, statusFilter, searchTerm]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "new":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            New
          </span>
        );
      case "read":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <Clock size={12} />
            Read
          </span>
        );
      case "replied":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 size={12} />
            Replied
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Contact Enquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            View and manage user enquiries submitted via the Contact Us form.
          </p>
        </div>

        <button
          type="button"
          onClick={loadData}
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:text-[#30AFFF] disabled:opacity-60"
        >
          <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        <StatCard
          title="Total Messages"
          value={stats.total || 0}
          description="All received submissions"
          icon={<Inbox size={21} />}
          iconClass="bg-blue-50 text-blue-600"
        />
        <StatCard
          title="New Enquiries"
          value={stats.new || 0}
          description="Awaiting review"
          icon={<Mail size={21} />}
          iconClass="bg-amber-50 text-amber-600"
        />
        <StatCard
          title="Read / Reviewed"
          value={stats.read || 0}
          description="Opened messages"
          icon={<Clock size={21} />}
          iconClass="bg-indigo-50 text-indigo-600"
        />
        <StatCard
          title="Replied"
          value={stats.replied || 0}
          description="Resolved enquiries"
          icon={<CheckCircle2 size={21} />}
          iconClass="bg-emerald-50 text-emerald-600"
        />
      </div>

      {/* Filter & Search Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, subject, phone..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50/70 py-2.5 pl-10 pr-4 text-xs sm:text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-[#30AFFF] focus:bg-white focus:ring-4 focus:ring-[#30AFFF]/10"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { label: "All", value: "all" },
              { label: "New", value: "new" },
              { label: "Read", value: "read" },
              { label: "Replied", value: "replied" },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setStatusFilter(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  statusFilter === tab.value
                    ? "bg-[#30AFFF] text-white shadow-sm shadow-[#30AFFF]/25"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {loading && filteredEnquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <RefreshCw size={28} className="animate-spin mb-3 text-[#30AFFF]" />
            <p className="text-sm font-medium">Loading enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center px-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-3">
              <Inbox size={26} />
            </div>
            <h3 className="text-sm font-bold text-slate-800">
              No Enquiries Found
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm">
              {searchTerm || statusFilter !== "all"
                ? "No contact submissions match your current search and filter criteria."
                : "No contact submissions have been received yet."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <th className="py-3.5 px-4 sm:px-6">Sender</th>
                  <th className="py-3.5 px-4">Subject & Message</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredEnquiries.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-slate-50/60 transition group cursor-pointer"
                    onClick={() => handleViewDetails(item)}
                  >
                    {/* Sender */}
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#30AFFF]/20 to-blue-500/20 text-[#159FEF] font-bold text-xs">
                          {item.name ? item.name.charAt(0).toUpperCase() : "U"}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-slate-900 truncate">
                            {item.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {item.email}
                          </p>
                          {item.phone && (
                            <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <Phone size={10} />
                              {item.phone}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Subject & Preview */}
                    <td className="py-4 px-4 max-w-xs sm:max-w-md">
                      <p className="font-semibold text-slate-900 truncate">
                        {item.subject || "No Subject"}
                      </p>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {item.message}
                      </p>
                    </td>

                    {/* Status */}
                    <td
                      className="py-4 px-4 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={item.status}
                        disabled={updatingId === item._id}
                        onChange={(e) =>
                          handleStatusChange(item._id, e.target.value)
                        }
                        className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 outline-none transition hover:border-[#30AFFF] focus:border-[#30AFFF]"
                      >
                        <option value="new">🟡 New</option>
                        <option value="read">🔵 Read</option>
                        <option value="replied">🟢 Replied</option>
                      </select>
                    </td>

                    {/* Date */}
                    <td className="py-4 px-4 whitespace-nowrap text-xs text-slate-500">
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString("en-IN", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </td>

                    {/* Actions */}
                    <td
                      className="py-4 px-4 sm:px-6 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleViewDetails(item)}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-[#30AFFF] hover:text-[#30AFFF]"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeletingItem(item)}
                          disabled={deletingId === item._id}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white text-rose-500 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-600 disabled:opacity-50"
                          title="Delete Enquiry"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =====================================================
          VIEW DETAILS MODAL
      ===================================================== */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-7 shadow-2xl space-y-5 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#30AFFF]">
                    Contact Message
                  </span>
                  {getStatusBadge(selectedEnquiry.status)}
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 mt-1">
                  {selectedEnquiry.subject || "Enquiry Details"}
                </h2>
              </div>

              <button
                onClick={() => setSelectedEnquiry(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Sender Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 bg-slate-50/70 p-4 rounded-2xl border border-slate-100 text-xs sm:text-sm">
              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Full Name
                </p>
                <p className="font-bold text-slate-900 flex items-center gap-1.5">
                  <User size={14} className="text-[#30AFFF]" />
                  {selectedEnquiry.name}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Email Address
                </p>
                <p className="font-bold text-slate-900 truncate flex items-center gap-1.5">
                  <Mail size={14} className="text-[#30AFFF]" />
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="hover:underline text-blue-600"
                  >
                    {selectedEnquiry.email}
                  </a>
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Phone size={14} className="text-[#30AFFF]" />
                  {selectedEnquiry.phone ? (
                    <a
                      href={`tel:${selectedEnquiry.phone}`}
                      className="hover:underline text-slate-800"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  ) : (
                    <span className="text-slate-400 italic">Not provided</span>
                  )}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Received At
                </p>
                <p className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <Calendar size={14} className="text-[#30AFFF]" />
                  {selectedEnquiry.createdAt
                    ? new Date(selectedEnquiry.createdAt).toLocaleString(
                        "en-IN",
                        {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )
                    : "N/A"}
                </p>
              </div>
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Message Content
              </p>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-100">
              {/* Quick Status Update */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-xs font-semibold text-slate-500">
                  Update Status:
                </span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) =>
                    handleStatusChange(selectedEnquiry._id, e.target.value)
                  }
                  className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 outline-none"
                >
                  <option value="new">🟡 New</option>
                  <option value="read">🔵 Read</option>
                  <option value="replied">🟢 Replied</option>
                </select>
              </div>

              {/* Reply via Email */}
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(
                    selectedEnquiry.subject || "Enquiry with CareerNova"
                  )}`}
                  onClick={() => handleStatusChange(selectedEnquiry._id, "replied")}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#30AFFF] px-4 py-2 text-xs font-bold text-white shadow-md shadow-[#30AFFF]/20 transition hover:bg-[#159FEF]"
                >
                  <Send size={13} />
                  Reply via Email
                </a>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ===================================================== */}
      {deletingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xl space-y-4 animate-in zoom-in-95 duration-200">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <AlertTriangle size={24} />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Delete Enquiry?
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Are you sure you want to delete the enquiry from{" "}
                <span className="font-semibold text-slate-800">
                  {deletingItem.name}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDeletingItem(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-rose-600/20 hover:bg-rose-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Enquiries;
