export interface EntityDetail {
    id: number;
    entity_type?: string;
    entity_name?: string;
    document_number?: string;
    fe_ein_number?: string;
    date_filed?: string;
    effective_date?: string;
    last_event?: string
    state?: string;
    status?: string;
    principal_address?: string;
    mailing_address?: string;
    registered_agent_name?: string;
    registered_agent_address?: string;
    principal_name_changed?: string;
    mailing_name_changed?: string;
    registered_agent_name_changed?: string;
    principal_address_changed?: string;
    mailing_address_changed?: string;
    registered_agent_address_changed?: string;
    authorized_persons?: any[];
    annual_reports?: any[];
    document_images?: any[];
  }