import { useState, useEffect } from "react";
import {
  useContactsGetList,
  useContactsDeleteMultipleMutation,
} from "@/services/contacts.service";
import useCustomToast from "@/hooks/useCustomToast";

export const useGroupContactsManager = ({ userId, groupId, shouldFetch }) => {
  const { errorToast } = useCustomToast();
  const [contacts, setContacts] = useState([]);
  const [contactIds, setContactIds] = useState([]);

  const { isLoading: isFetchingContacts, refetch: refetchContacts } =
    useContactsGetList({
      params: {
        userId,
        groupId,
        page: 1,
        limit: 10000,
      },
      queryParams: {
        enabled: false,
        onSuccess: (res) => {
          const fetchedContacts = res?.contacts ?? [];
          setContacts(fetchedContacts);
          setContactIds(fetchedContacts.map((contact) => contact.id));
        },
        onError: (err) => {
          errorToast(
            `${err?.status}: ${err?.data?.error || "Failed to fetch contacts"}`
          );
          console.error("Error fetching group contacts:", err);
        },
      },
    });

  // Delete multiple contacts mutation
  const { mutate: deleteMultipleContacts, isLoading: isDeletingContacts } =
    useContactsDeleteMultipleMutation({
      onSuccess: () => {},
      onError: (err) => {
        errorToast(
          `${err?.status}: ${err?.data?.error || "Failed to delete contacts"}`
        );
        console.error("Error deleting contacts:", err);
      },
    });

  useEffect(() => {
    if (shouldFetch && groupId && userId) {
      refetchContacts();
    } else if (!shouldFetch) {
      setContacts([]);
      setContactIds([]);
    }
  }, [shouldFetch, groupId, userId, refetchContacts]);

  const deleteGroupContacts = () => {
    return new Promise((resolve, reject) => {
      if (contactIds.length === 0) {
        resolve();
        return;
      }

      deleteMultipleContacts(
        { userId, contactIds },
        {
          onSuccess: () => resolve(),
          onError: (err) => reject(err),
        }
      );
    });
  };

  return {
    contacts,
    contactIds,
    contactCount: contacts.length,
    isFetchingContacts,
    isDeletingContacts,
    deleteGroupContacts,
  };
};
