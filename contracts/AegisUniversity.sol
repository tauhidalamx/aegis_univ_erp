// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title AegisUniversity
 * @dev On-chain credential manager and tuition payment gateway.
 * Implements Soulbound Certificates (non-transferable academic credentials) and fee payment registries.
 */
contract AegisUniversity {
    
    address public owner;
    
    struct Certificate {
        string studentId;
        string studentName;
        string course;
        string grade;
        uint256 issueDate;
        address issuer;
        bool isValid;
    }
    
    // Mapping from Certificate ID to Certificate details
    mapping(uint256 => Certificate) private certificates;
    uint256 public nextCertificateId;
    
    // Mapping from Student ID to total tuition fees paid on-chain (in Wei)
    mapping(string => uint256) public tuitionFeesPaid;
    
    // Mapping for authorized certificate issuers (e.g. Registrar, Faculty)
    mapping(address => bool) public authorizedMinters;
    
    // Events
    event CertificateMinted(
        uint256 indexed certificateId,
        string studentId,
        string studentName,
        string course,
        string grade,
        uint256 issueDate,
        address indexed issuer
    );
    
    event CertificateRevoked(
        uint256 indexed certificateId,
        string reason
    );
    
    event FeePaid(
        string indexed studentId,
        address indexed sender,
        uint256 amount,
        uint256 timestamp
    );
    
    event MinterAuthorized(address indexed account);
    event MinterDeauthorized(address indexed account);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "AegisUniversity: Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorized() {
        require(
            msg.sender == owner || authorizedMinters[msg.sender],
            "AegisUniversity: Caller is not authorized to mint"
        );
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedMinters[msg.sender] = true;
    }
    
    /**
     * @dev Authorize a new account to mint certificates (e.g. Registrar's office).
     */
    function authorizeMinter(address account) external onlyOwner {
        authorizedMinters[account] = true;
        emit MinterAuthorized(account);
    }
    
    /**
     * @dev Deauthorize an account from minting certificates.
     */
    function deauthorizeMinter(address account) external onlyOwner {
        authorizedMinters[account] = false;
        emit MinterDeauthorized(account);
    }
    
    /**
     * @dev Mint a new Soulbound Certificate NFT for a student.
     * This credential is non-transferable and represents academic completion.
     */
    function mintCertificate(
        string calldata studentId,
        string calldata studentName,
        string calldata course,
        string calldata grade
    ) external onlyAuthorized returns (uint256) {
        uint256 certId = nextCertificateId++;
        
        certificates[certId] = Certificate({
            studentId: studentId,
            studentName: studentName,
            course: course,
            grade: grade,
            issueDate: block.timestamp,
            issuer: msg.sender,
            isValid: true
        });
        
        emit CertificateMinted(
            certId,
            studentId,
            studentName,
            course,
            grade,
            block.timestamp,
            msg.sender
        );
        
        return certId;
    }
    
    /**
     * @dev Revoke a certificate in case of administrative error or academic infraction.
     */
    function revokeCertificate(uint256 certificateId, string calldata reason) external onlyAuthorized {
        require(certificates[certificateId].isValid, "AegisUniversity: Certificate is already invalid or non-existent");
        certificates[certificateId].isValid = false;
        emit CertificateRevoked(certificateId, reason);
    }
    
    /**
     * @dev Pay student tuition fees on-chain. Funds accumulate on the contract and can be withdrawn by the owner.
     */
    function payTuition(string calldata studentId) external payable {
        require(msg.value > 0, "AegisUniversity: Payment must be greater than zero");
        
        tuitionFeesPaid[studentId] += msg.value;
        
        emit FeePaid(studentId, msg.sender, msg.value, block.timestamp);
    }
    
    /**
     * @dev Retrieve certificate details.
     */
    function getCertificate(uint256 certificateId)
        external
        view
        returns (
            string memory studentId,
            string memory studentName,
            string memory course,
            string memory grade,
            uint256 issueDate,
            address issuer,
            bool isValid
        )
    {
        Certificate memory cert = certificates[certificateId];
        require(cert.issueDate > 0, "AegisUniversity: Certificate does not exist");
        return (
            cert.studentId,
            cert.studentName,
            cert.course,
            cert.grade,
            cert.issueDate,
            cert.issuer,
            cert.isValid
        );
    }
    
    /**
     * @dev Withdraw all collected fee payments to the university treasury.
     */
    function withdrawFunds() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "AegisUniversity: No funds to withdraw");
        
        (bool success, ) = owner.call{value: balance}("");
        require(success, "AegisUniversity: Withdrawal failed");
    }
}
