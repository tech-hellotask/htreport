import { WorkerType } from "../../utils/types";
import styled from "styled-components";
import WorkerProfileInfo from "../../components/worker/profile/info";
import { useQuery } from "@tanstack/react-query";
import { CustomError } from "../../utils/errors";
import { getWorkerById } from "../../net/worker";
import { ErrorAlert } from "../../lib/Alerts";
import { useParams } from "react-router-dom";
import WorkerLedger from "../../components/worker/profile/ledger";
import { Row } from "antd";

export default function WorkerProfile({
  id: defaultId,
}: {
  id?: number | null;
}) {
  const { id } = useParams<{ id: string }>();
  const {
    isSuccess,
    data: worker,
    isLoading,
    isError,
    error,
  } = useQuery<WorkerType, CustomError>({
    queryKey: [`/worker/${id || defaultId}/profile`, id || defaultId],
    queryFn: getWorkerById,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <ErrorAlert isError={isError} error={error} />;

  return (
    <Wrapper gutter={[24, 16]}>
      {isSuccess && <WorkerProfileInfo worker={worker} />}
      <WorkerLedger id={id || defaultId} />
    </Wrapper>
  );
}

const Wrapper = styled(Row)``;
