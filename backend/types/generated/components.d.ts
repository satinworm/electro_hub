import type { Schema, Attribute } from '@strapi/strapi';

export interface BradnSectionSect extends Schema.Component {
  collectionName: 'components_bradn_section_sects';
  info: {
    displayName: 'sect';
    icon: 'command';
  };
  attributes: {};
}

export interface HeadingForSectionHeading extends Schema.Component {
  collectionName: 'components_heading_for_section_headings';
  info: {
    displayName: 'heading';
    icon: 'bold';
    description: '';
  };
  attributes: {
    h1: Attribute.String;
    h2: Attribute.String;
    h3: Attribute.String;
    btn: Attribute.String;
  };
}

export interface LinksLink extends Schema.Component {
  collectionName: 'components_links_links';
  info: {
    displayName: 'Link';
    icon: 'attachment';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    href: Attribute.String & Attribute.Required;
  };
}

export interface PagePropertiesMetaTag extends Schema.Component {
  collectionName: 'components_page_properties_meta_tags';
  info: {
    displayName: 'MetaTag';
    icon: 'code';
  };
  attributes: {
    Name: Attribute.String;
    Content: Attribute.String;
  };
}

export interface PagePropertiesSection extends Schema.Component {
  collectionName: 'components_page_properties_sections';
  info: {
    displayName: 'section';
    icon: 'apps';
    description: '';
  };
  attributes: {
    heading: Attribute.Component<'heading-for-section.heading', true>;
    section_name: Attribute.String;
    stage_card: Attribute.Component<'stage-card.stage-card', true>;
  };
}

export interface PagePropertiesSeo extends Schema.Component {
  collectionName: 'components_page_properties_seos';
  info: {
    displayName: 'SEO';
    icon: 'filter';
  };
  attributes: {
    MetaTitle: Attribute.String &
      Attribute.Required &
      Attribute.DefaultTo<'MetaDescription'>;
    MetaDescription: Attribute.String & Attribute.Required;
    MetaTag: Attribute.Component<'page-properties.meta-tag', true>;
  };
}

export interface SaleTypeSaleType extends Schema.Component {
  collectionName: 'components_sale_type_sale_types';
  info: {
    displayName: 'sale_type';
    icon: 'crown';
    description: '';
  };
  attributes: {
    type: Attribute.String;
  };
}

export interface SectionButton extends Schema.Component {
  collectionName: 'components_section_buttons';
  info: {
    displayName: 'button';
    icon: 'connector';
  };
  attributes: {
    text: Attribute.String;
  };
}

export interface StageCardCard extends Schema.Component {
  collectionName: 'components_stage_card_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface StageCardStageCard extends Schema.Component {
  collectionName: 'components_stage_card_stage_cards';
  info: {
    displayName: 'stage_card';
    icon: 'code';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.String & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'bradn-section.sect': BradnSectionSect;
      'heading-for-section.heading': HeadingForSectionHeading;
      'links.link': LinksLink;
      'page-properties.meta-tag': PagePropertiesMetaTag;
      'page-properties.section': PagePropertiesSection;
      'page-properties.seo': PagePropertiesSeo;
      'sale-type.sale-type': SaleTypeSaleType;
      'section.button': SectionButton;
      'stage-card.card': StageCardCard;
      'stage-card.stage-card': StageCardStageCard;
    }
  }
}
