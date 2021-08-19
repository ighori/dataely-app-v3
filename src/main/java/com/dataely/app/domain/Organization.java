package com.dataely.app.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

/**
 * A Organization.
 */
@Entity
@Table(name = "organization", uniqueConstraints = { @UniqueConstraint(columnNames = { "name" }) })
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Organization implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "organisation_id_seq", sequenceName = "organisation_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "organisation_id_seq")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "detail")
    private String detail;

    @CreationTimestamp
    @Column(name = "creation_date")
    private Instant creationDate;

    @UpdateTimestamp
    @Column(name = "last_updated")
    private Instant lastUpdated;

    @OneToMany(mappedBy = "organization")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "applications", "organization" }, allowSetters = true)
    private Set<BusinessUnit> businessUnits = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Organization id(Long id) {
        this.id = id;
        return this;
    }

    public String getName() {
        return this.name;
    }

    public Organization name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDetail() {
        return this.detail;
    }

    public Organization detail(String detail) {
        this.detail = detail;
        return this;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public Instant getCreationDate() {
        return this.creationDate;
    }

    public Organization creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public Instant getLastUpdated() {
        return this.lastUpdated;
    }

    public Organization lastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
        return this;
    }

    public void setLastUpdated(Instant lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Set<BusinessUnit> getBusinessUnits() {
        return this.businessUnits;
    }

    public Organization businessUnits(Set<BusinessUnit> businessUnits) {
        this.setBusinessUnits(businessUnits);
        return this;
    }

    public Organization addBusinessUnit(BusinessUnit businessUnit) {
        this.businessUnits.add(businessUnit);
        businessUnit.setOrganization(this);
        return this;
    }

    public Organization removeBusinessUnit(BusinessUnit businessUnit) {
        this.businessUnits.remove(businessUnit);
        businessUnit.setOrganization(null);
        return this;
    }

    public void setBusinessUnits(Set<BusinessUnit> businessUnits) {
        if (this.businessUnits != null) {
            this.businessUnits.forEach(i -> i.setOrganization(null));
        }
        if (businessUnits != null) {
            businessUnits.forEach(i -> i.setOrganization(this));
        }
        this.businessUnits = businessUnits;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Organization)) {
            return false;
        }
        return id != null && id.equals(((Organization) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Organization{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", detail='" + getDetail() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", lastUpdated='" + getLastUpdated() + "'" +
            "}";
    }
}
