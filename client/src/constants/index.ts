export const DOCUMENT_TYPES = [
  { value: "nda", label: "Non-Disclosure Agreement" },
  { value: "contract", label: "Service Contract" },
  { value: "lease", label: "Lease Agreement" },
];

export const PAGE_TRANSITION = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
};
